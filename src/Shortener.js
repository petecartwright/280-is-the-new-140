import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Jumbotron, Grid, FormControl, FormGroup, Button, InputGroup, Panel } from 'react-bootstrap';



class MagicShorteningPanel extends Component {


    // this.setState({ isLoading: true }); 
    // this.setLoadingTimer(); // pretend this is taking any time at all

    // setLoadingTimer(){

    //   let time_to_wait = 750; // 3/4 second

    //   setTimeout(function(){
    //       this.setState( { isLoading: false });
    //   }.bind(this), time_to_wait);

    // }

    // // if we're pretending to be loading, show the 'loading' text
    // if (isLoading) {

    //   panel = <Panel> 
    //               <p>Generating shorter tweet with proprietary algorithm, please wait...</p>
    //           </Panel>
    // // if we've just submitted a new string, display the lil shortening animation, 
    // // then 
    // } else if (justSubmitted) {
    //   panel = <Panel> </Panel>
    // // otherwise just display an empty panel
    // } else {
    //   panel = <Panel> </Panel> 
    // }

  componentDidUpdate(prevProps, prevState){

    // wait a second for ppl to be able to read the text
    // then apply the animate out CSS tags and let animate.css take them
    // then remove the elements from the DOM altogether
    setTimeout(function(){
        const chars_to_remove = document.querySelectorAll("span.character-to-remove");
        chars_to_remove.forEach(function(elem){ elem.className = 'animated flipOutX'; });
        setTimeout(function(){
           chars_to_remove.forEach(function(elem){ elem.remove() }); 
        },1000);
      },1500);

  }

  render() {  
      console.log('in MagicShorteningPanel render')
      console.log('props are ')
      console.log(this.props)
      let initial_text = this.props.initial_text;
      let output_spans = [];

      for (let index in initial_text ) {
        if (index%2 === 0 ){
          output_spans.push(<span key={index} className='character-to-remove'>{initial_text[index]}</span>)
        } else {
          output_spans.push(<span key={index} >{initial_text[index]}</span>)
        }
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
    console.log('Rendering Shortener, state is');
    console.log(this.state);
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
      </div>
    );
  }
}

export default Shortener;
