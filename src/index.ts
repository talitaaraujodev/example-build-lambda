import { SQSClient, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { SQSEvent, SQSRecord } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { Item } from './models/Item';
import { Order } from './models/Order';
import { Address } from './models/Address';
import { orderValidatorSchema } from './validators/orderValidator';
import { saveOrder } from './repository/orderRepository';
import { response } from './utils/response';

const sqsClient = new SQSClient({ region: 'us-east-1' });
interface OrderMessage {
  address: Address;
  items: Item[];
}
export const handler = async (event: SQSEvent) => {
  try {
    console.log('-> Event:', event);
    for (const record of event.Records) {
      const body: OrderMessage = JSON.parse(record.body);

      const { error } = orderValidatorSchema.validate(body);
      if (error) {
        throw new Error(`Erro de validação: ${error.message}`);
      }
      const items = body.items.map((item: any) => {
        return new Item(item.productId, item.name, item.price, item.quantity);
      });

      const address = new Address(
        body.address.zipcode,
        body.address.street,
        body.address.number,
        body.address.bairro,
        body.address.complement,
      );

      await saveOrder(new Order(uuidv4(), items, address, 1));
      await deleteMessage(record);
    }

    return response(201, {
      message: 'Mensagens do SQS processadas com sucesso.',
    });
  } catch (error) {
    console.error('Erro ao processar mensagem do SQS:', error);
    return await response(500, { message: 'Erro ao criar pedido.' });
  }
};

async function deleteMessage(record: SQSRecord): Promise<void> {
  const params = {
    QueueUrl: 'https:qs.us-east-1.amazonaws.com/590183874595/QueueCreateOrder',
    ReceiptHandle: record.receiptHandle,
  };

  await sqsClient.send(new DeleteMessageCommand(params));
}
