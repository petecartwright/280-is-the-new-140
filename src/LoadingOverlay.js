import React, { Component } from 'react';
import {Jumbotron, Grid, Form, FormControl, FormGroup, Button, InputGroup, Panel } from 'react-bootstrap';


class LoadingOverlay extends Component {

  constructor(props) {
    super(props);
    this.state = { 
                   isActive: False,
                   output_string: ''
                 };
   }
    
  render() {
    return (
      <div className="overlay">
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
            <Panel>
              {this.state.output_string}
            </Panel>
          </Jumbotron>
        </Grid>
      </div>
    );
  }
}

export default Shortener;
