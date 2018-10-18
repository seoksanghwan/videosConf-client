        this.socket.on('memberName', function(data){
          addMember(data)
        });
        const addMember = data => {
          this.setState({chatUser: [...this.state.chatUser, data]});
        };
        this.socket.emit('member', {
          mail: user.email
        });