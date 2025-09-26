// import { NextRequest } from "next/server";
// import { send } from "process";

// type Client = {
//   id: number;
//   controller: ReadableStreamDefaultController;
// };

// const clients: any[] = [];

// export async function GET(req: NextRequest){
//     return new Response(
//         new ReadableStream({
//             start(controller){
//                 const encoder = new TextEncoder();
//                 const send = (data: any)=> {
//                     controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
//                 }

//                 const client = {send};
//                 clients.push(client)
//             }

//             const interval = setInterval(()=>{
//                 send({ping : true})
//             },25000);

//         })
//     )
// }

import { NextRequest } from "next/server";

type Client = {
  id: number;
  controller: ReadableStreamDefaultController;
};

let clients: Client[] = [];
let clientId = 0;

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const id = clientId++;
      clients.push({ id, controller });

      // Remove client on disconnect
      req.signal.addEventListener("abort", () => {
        clients = clients.filter(c => c.id !== id);
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}

// Function to broadcast events to all clients
export function broadcast(data: unknown) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach(client => client.controller.enqueue(payload));
}
