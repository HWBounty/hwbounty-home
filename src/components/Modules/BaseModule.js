import { Component } from 'react';

//All future modules must extend this in some way
class BaseModule extends Component {
  static name = 'Unknown Module Name';
  static description = 'Unknown Module Description';

  constructor(props) {
    super(props);
  }
}
