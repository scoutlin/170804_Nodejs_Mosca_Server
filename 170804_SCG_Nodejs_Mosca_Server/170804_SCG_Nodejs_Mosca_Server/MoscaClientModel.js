'use strict';
console.log('Into Mosca Model');
let mosca = require("mosca")

class MoscaClientModel
{
    constructor(){
        //Dynamic Variable
        this.server = null
        this.sample = null
    }

    static get Instance(){
        if (MoscaClientModel.mMoscaClientModel == null)
        {
            MoscaClientModel.mMoscaClientModel = new MoscaClientModel();
        }

        return MoscaClientModel.mMoscaClientModel;
    }

    Init(){
        //1. Set Init Setting
        let pubsubsettings = {
            ////using ascoltatore
            //type: 'mongo',
            //url: 'mongodb://localhost:27017/mqtt',
            //pubsubCollection: 'ascoltatori',
            //mongo: {}
        };

        //2. Start Server
        let moscaSettings = {
            port: 1883,			//mosca (mqtt) port
            backend: pubsubsettings	//pubsubsettings is the object we created above 

        };

        this.server = new mosca.Server(moscaSettings);	//here we start mosca
        // fired when the mqtt server is ready
        this.server.on('ready', function () {
            console.log('Mosca server is up and running')   
        }.bind(this));	//on init it fires up setup()

        //3. Regist Event
        // fired when a message is published
        this.server.on('published', function (packet, client){
            //console.log('Published', packet);
            console.log("Client: ", client);

            //console.log("client.id: " + client.payload);

            console.log("payload: " + packet.payload);
            console.log("topic: " + packet.topic);
            console.log("qos: " + packet.qos);
            console.log("retain: " + packet.retain);
        }.bind(this));

        // fired when a client connects
        this.server.on('clientConnected', function (client){
            console.log('Client Connected:', client.id);          
        }.bind(this));

        // fired when a client disconnects
        this.server.on('clientDisconnected', function (client){
            console.log('Client Disconnected:', client.id);
        }.bind(this));
    }

    MqttPublish(topic, payload){
        var message = {
            //topic: '/hello/world',
            topic: topic,
            //payload: 'abcde', // or a Buffer
            payload: payload,
            qos: 1, // 0, 1, or 2
            retain: true // or true
        };

        this.server.publish(message, function () {
            console.log('done!');
        });
    }

    test() {
    }
}

//Static Variable
MoscaClientModel.mMoscaClientModel = null;

module.exports = MoscaClientModel

console.log('Exit Mosca Model');