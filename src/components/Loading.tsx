import React, { Component } from 'react'

interface ILoadingProps {
  text: string;
  speed: number;
}

interface ILoadingState {
  text: string;
}

class Loading extends Component<ILoadingProps, ILoadingState> {

  private interval: any;

  static defaultProps = {
    text: 'Loading...',
    speed: 500
  };

  constructor(props: ILoadingProps) {
    super(props);

    this.state = {
      text: props.text,
    }
  }

  componentDidMount() {
    const { text, speed } = this.props;
    const stopper = text + '...';
    this.interval = setInterval(() => {
      if (this.state.text === stopper) {
        this.setState({
          text: text,
        });
      } else {
        this.setState((prevState) => ({
          text: prevState.text + '.'
        }));
      }
    }, speed);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <p style={{ textAlign: 'center', fontSize: '35px',}}>
        {this.state.text}
      </p>
    );
  }
}

export default Loading;
