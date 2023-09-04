const amqp = require('amqplib');

/**
 * ProducerService is a service that will be used to send a message to the queue.
 */
const ProducerService = {
    /**
     * sendMessage is a function that will be used to send a message to the queue.
     */
    sendMessage: async (queue, message) => {
        const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, {
            durable: true,
        });

        await channel.sendToQueue(queue, Buffer.from(message));

        setTimeout(() => {
            connection.close();
        }, 1000);
    },
};

module.exports = ProducerService;
