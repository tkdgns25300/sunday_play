const PORTONE_API_URL = "https://api.portone.io";

export async function getPortOnePayment(paymentId: string) {
  const response = await fetch(
    `${PORTONE_API_URL}/payments/${encodeURIComponent(paymentId)}`,
    {
      headers: {
        Authorization: `PortOne ${process.env.PORTONE_API_SECRET}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("포트원 결제 조회 실패");
  }

  return response.json();
}
