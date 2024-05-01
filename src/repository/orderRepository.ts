import { v4 as uuidv4 } from 'uuid';
import {
  DynamoDBClient,
  TransactWriteItemsCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { Order } from '../models/Order';

export async function saveOrder(order: Order): Promise<void> {
  const region = process.env.REGION || 'us-east-1';
  const tableOrders = process.env.TABLE_ORDERS || 'orders';
  const tableOrderItems = process.env.TABLE_ORDER_ITEMS || 'order_items';

  const dynamoDBClient = new DynamoDBClient({ region: region });

  const orderParams: PutItemCommandInput = {
    TableName: tableOrders,
    Item: {
      Id: { S: order.id },
      address: {
        M: {
          zipcode: { S: order.address.zipcode },
          street: { S: order.address.street },
          number: { N: String(order.address.number) },
          bairro: { S: order.address.bairro },
          complement: { S: order.address.complement },
        },
      },
      status: { N: String(order.status) },
      total: { N: String(order.total()) },
      createdAt: { S: new Date().toISOString() },
      updatedAt: { S: new Date().toISOString() },
    },
  };

  const orderItemsParams: PutItemCommandInput[] = order.items.map(
    (item: any) => ({
      TableName: tableOrderItems,
      Item: {
        Id: { S: uuidv4() },
        orderId: { S: order.id },
        itemId: { S: item.productId },
        createdAt: { S: new Date().toISOString() },
        updatedAt: { S: new Date().toISOString() },
      },
    }),
  );

  await dynamoDBClient.send(
    new TransactWriteItemsCommand({
      TransactItems: [
        { Put: orderParams },
        ...orderItemsParams.map(params => ({ Put: params })),
      ],
    }),
  );
}
