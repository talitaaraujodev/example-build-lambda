export const response = async (status: number, body: any) => {
  return {
    statusCode: status,
    body: JSON.stringify({ message: 'Pedido criado com sucesso!' }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
};
