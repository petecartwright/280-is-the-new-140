import React, { Component } from 'react';
import {Jumbotron, Grid, FormControl, FormGroup, Button, InputGroup, Panel } from 'react-bootstrap';



class MagicShorteningPanel extends Component {

  constructor(props){
    super(props);
    this.state = { 
                    initial_text: '',
                    final_text: '',
                    loading: false,
                    animating_text: false,
                    done_animating: false
                  }
    this.handleLoadingAnimation = this.handleLoadingAnimation.bind(this);
    this.handleTextAnimation = this.handleTextAnimation.bind(this);
    /**             }
     * the states this component can be in:
     * 
     * Blank/Default: this.props.initial_text = ''
     * Loading: loading === true // show the loading text
     * Text Animating: animating_text === true // text has been loading and is being animated
     * Shortened: final_text !== '', loading === false, animating_text === false. text is stable and final text should be copyable
    */
  }

  handleTextAnimation(){
    // give the text animation a second to run
    // then turn off that flag and set the final text to what we want to display
    let final_text = '';
    let initial_text = this.props.initial_text;
    for (let index in initial_text) {
      if (index%2 === 0 ){
        final_text += initial_text[index];
      }
    }

    setTimeout(
      function(){
        this.setState({animating_text: false, final_text: final_text });
      }.bind(this),
      1000
    );
  }

  handleLoadingAnimation(){
    // give the 'loading' text a second to display, then call handleTextAnimation to actually animate the text
    setTimeout(
        function(){
            // after a second, 
            this.setState({loading: false, animating_text: true});
            this.handleTextAnimation();
          }.bind(this), 
          1000);
  }

  componentWillReceiveProps(nextProps){
    // only start our updates if we get new initial text
    if (this.state.initial_text !== nextProps.initial_text) {
      this.setState({ initial_text: nextProps.initial_text,
                      loading: true
                      })
      // then hand it off to the Loading... text
      this.handleLoadingAnimation();
    }
  }

  render() {  

    let initial_text = this.props.initial_text;
    let output_spans = [];

    if (this.props.initial_text === '' ){
      output_spans.push(<span key='1'></span>)

    } else if (this.state.loading) {
      output_spans.push(<span key='1'>Running proprietary algorithm...</span>)

    } else if (this.state.animating_text) {
      for (let index in initial_text ) {
        let key = Math.random();
        if (index%2 === 1 ){
          output_spans.push(<span key={key} className='character-to-remove animated flipOutX'>{initial_text[index]}</span>)
        } else {
          output_spans.push(<span key={key} >{initial_text[index]}</span>)
        }
      }
    } else {
      output_spans.push(<span key='1'> {this.state.final_text} </span>)      
    }


    
    return(
      <Panel>
        <p>{output_spans}</p>
      </Panel>
    )
  }
}



class Shortener extends Component {

  constructor(props) {
    super(props);
    this.state = { 
                   input_string: '',    // updates every keystroke
                   text_to_shorten: ''  // only will update this when Submit is hit
                 };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   }

  handleInputChange(e){
    this.setState({ input_string: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault(); // don't reload the page
    this.setState({ text_to_shorten: this.state.input_string });
  }



  render() {
    // console.log('Rendering Shortener, state is');
    // console.log(this.state);
    return (
      <div className="shortener">
        <Grid style={ {paddingTop: '5%'} }>
          <Jumbotron>
            <h2>Let us handle that overly long tweet for you.</h2>
            <br/>
            <br/>
            <form onSubmit={ this.handleSubmit }>
              <FormGroup>
                <InputGroup>
                  <FormControl
                    id="inputTextField"
                    type="text"
                    value={this.state.input_string}
                    placeholder="Paste too-long tweet here"
                    onChange={this.handleInputChange}
                />
                <InputGroup.Button>
                  <Button  type="submit"> Shorten </Button>
                </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </form>
            <MagicShorteningPanel initial_text={this.state.text_to_shorten}  />
          </Jumbotron>
        </Grid>
        v2
      </div>
    );
  }
}

export default Shortener;
