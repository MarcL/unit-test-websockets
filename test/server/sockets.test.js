import proxyquire from 'proxyquire';
import EventEmitter from 'events';

describe('sockets', () => {
    const dummyLogger = {
        log: (message) => {
            console.log(message);
        },
    };
    const fakeServer = sinon.spy();
    const socketsIoStub = sinon.stub();

    let sockets;
    let fakeEventEmitter;
    let fakeSocket;
    let spyFakeEventEmitterEmit;

    beforeEach(() => {
        fakeEventEmitter = new EventEmitter();
        fakeSocket = new EventEmitter();
        socketsIoStub.returns(fakeEventEmitter);
        sockets = proxyquire.load('../../server/sockets', {
            'socket.io': socketsIoStub,
        });

        spyFakeEventEmitterEmit = sinon.spy(fakeEventEmitter, 'emit');
    });

    afterEach(() => {
    });

    it('should create socket with given server', () => {
        sockets.default(fakeServer, dummyLogger);

        expect(socketsIoStub).to.be.calledWithExactly(fakeServer);
    });

    describe('when connection message is sent', () => {
        it('should send expected message to client when message event is received', () => {
            const givenMessage = 'givenMessage';
            sockets.default(fakeServer, dummyLogger);

            // Fake sending of connection from client
            fakeEventEmitter.emit('connection', fakeSocket);

            // Fake sending of message from client
            fakeSocket.emit('clientMessage', givenMessage);

            expect(spyFakeEventEmitterEmit)
                .to.have.been.calledWith('serverMessage', givenMessage);
        });
    });
});
