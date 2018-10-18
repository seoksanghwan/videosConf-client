    this.history = createHistory();
    this.socket = io(localHostIp);
    const socket = this.socket;

    socket.on('RECEIVE_MESSAGE', function(data){
      addMessage(data);
    });
    const addMessage = data => {
      this.setState({messages: [...this.state.messages, data]});
    };
    this.sendMessage = ev => {
      ev.preventDefault();
      socket.emit('SEND_MESSAGE', {
          author: this.state.displayName,
          message: this.msg.value
      })
      this.msg.value = ''
    }