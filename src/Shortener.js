import React, { Component } from 'react';
import {Jumbotron, Grid, Form, FormControl, FormGroup, Button, InputGroup, Panel } from 'react-bootstrap';

const proprietary_shortening_algorithm = function(input_string){

    let length_of_string = input_string.length;
    var output_string = '';

    for (let i = 0; i < length_of_string; i++){
      if (i%2 === 0){
        output_string += input_string[i];
      }
    }
    return output_string
  };  


class Shortener extends Component {

  constructor(props) {
    super(props);
    this.state = { 
                   input_string: '',
                   output_string: '',
                   isLoading: false
                 };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setLoadingTimer = this.setLoadingTimer.bind(this);
   }


  setLoadingTimer(){
    // create a timer for a random 1-4 second period to load
    let min_time = 1000;  // one second
    let max_time = 2000;  // 4 seconds
    let time_to_wait = Math.random() * (max_time - min_time) + min_time;
    console.log('setting timer for ' + time_to_wait.toString()); 
    setTimeout(function(){
        console.log('in timeout function');
        console.log('isLoading is ')
        this.setState( { isLoading: false });
    }.bind(this), time_to_wait);
    console.log('past timeout function');
  }


  handleInputChange(e){
    this.setState({ input_string: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault(); // don't reload the page
    this.setState({ isLoading: true });
    this.setLoadingTimer();
    // then actually set the new 
    var new_output_string = proprietary_shortening_algorithm(this.state.input_string);
    this.setState({ output_string: new_output_string });
    
  }

  

  render() {

    let isLoading = this.state.isLoading;
    let panel = null;
    if (isLoading) {
      panel = <Panel> Generating shortened tweet with proprietary algorithm, please wait... </Panel>
    } else {
      panel = <Panel> {this.state.output_string}</Panel>
    }

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
                  <Button bsStyle="primary" type="submit"> Shorten </Button>
                </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </form>
            {panel}
          </Jumbotron>
        </Grid>
      </div>
    );
  }
}

export default Shortener;
