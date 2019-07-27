import React, {
  Component
} from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Alert,
  Collapse,
} from "reactstrap";
import {
  AppSwitch
} from '@coreui/react'
import SocketIoHelper from "../../helpers/socketHelper";


class Bike extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      settings: "",
      state: "",
      visible: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.reloadStatus();

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  reloadStatus() {
    SocketIoHelper.getSettings(settings =>
      this.setState({ settings })
    )
    SocketIoHelper.getState(state =>
      this.setState({ state })
    );
  }

  saveSettings = () => {
    SocketIoHelper.saveSettings(this.state.settings);
    this.showMessage();
  };

  toggleButton = () => {
    this.reloadStatus();
  }

  onDismiss = () => {
    this.setState({
      visible: false
    });
  };

  showMessage = () => {
    this.setState({
      visible: true
    })
    setTimeout(this.onDismiss, 2500);
  };

  handleSwitch = name => {
    const settings = this.wSettings;
    const value = !settings[name];

    settings[name] = value;
  };

  handleText = (name, event) => {
    const settings = this.wSettings;
    const value = event.target.value;

    if (event.target.validity.valid) {
      settings[name] = value;
    }
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    if (this.state.state === "") {
      return null;
    }
    return (
      <div className="animated fadeIn" >
        <Row>
          <Col xs="12" xl="6">
            <CardState
              settings={this.state.settings}
              state={this.state.state}
              toggleButton={this.toggleButton}
            />

            <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss}>
              Impostazioni salvate
            </Alert>
          </Col>

          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <strong>Impostazioni</strong>
              </CardHeader>
              {/* <CardBody>
                <Form action="" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="10">
                      <Label>Log</Label>
                    </Col>
                    <Col md="2">
                      <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline={'alt'} disabled={true} label ref={this.state.settings.log} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="10">
                      <Label>Video</Label>
                    </Col>
                    <Col md="2">
                      <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline={'alt'} disabled={true} label checked={this.state.settings.video} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="10">
                      <Label>Ant</Label>
                    </Col>
                    <Col md="2">
                      <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline={'alt'} disabled={true} label checked={this.state.settings.ant} />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="9">
                      <Label>Potenza media</Label>
                    </Col>
                    <Col md="3">
                      <Input className="text-center" type="number" min="0" pattern="[0-9]*"
                        value={this.state.settings.average_power_time}
                        onChange={this.handleText.bind(this, 'average_power_time')} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="9">
                      <Label>Led Mode</Label>
                    </Col>
                    <Col md="3">
                      <Input className="text-center" type="number" min="0" pattern="[0-9]*"
                        value={this.state.settings.led_mode}
                        onChange={this.handleText.bind(this, 'led_mode')} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="9">
                      <Label>Circonferenza</Label>
                    </Col>
                    <Col md="3">
                      <Input className="text-center" type="number" min="0" pattern="[0-9]*"
                        value={this.state.settings.circumference}
                        onChange={this.handleText.bind(this, 'circumference')} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="10">
                      <Label>Csv</Label>
                    </Col>
                    <Col md="2">
                      <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline={'alt'} label
                        onChange={this.handleSwitch.bind(this, 'csv')}
                        checked={this.state.settings.csv} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="9">
                      <Label>Timer</Label>
                    </Col>
                    <Col md="3">
                      <Input className="text-center" type="number" min="0" pattern="[0-9]*"
                        value={this.state.settings.timer}
                        onInput={this.handleText.bind(this, 'timer')} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="10">
                      <Label>Calibrazione</Label>
                    </Col>
                    <Col md="2">
                      <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline={'alt'} label
                        onChange={this.handleSwitch.bind(this, 'calibration')}
                        checked={this.state.settings.calibration} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="9">
                      <Label>Valore calibrazione</Label>
                    </Col>
                    <Col md="3">
                      <Input className="text-center" type="number" min="0" pattern="[0-9]*"
                        value={this.state.settings.calibration_value}
                        onInput={this.handleText.bind(this, 'calibration_value')} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="10">
                      <Label>Record video</Label>
                    </Col>
                    <Col md="2">
                      <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline={'alt'} label
                        onChange={this.handleSwitch.bind(this, 'video_record')}
                        checked={this.state.settings.video_record}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody> */}

              {/* <CardFooter>
                <Row>
                  <Col md="9">
                    <Button type="submit" data-dismiss='alert' size="sl" color="success" onClick={this.saveSettings}><i className="fa fa-download"></i> Save</Button>
                    &ensp;
                  </Col>
                  <Col md="3">
                    <div className="text-center">{this.wSettings.update}</div>
                  </Col>
                </Row>
              </CardFooter> */}
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

class CardState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "",
      collapse: false,
    };
  }

  componentWillReceiveProps() {
    this.updateStatus();
  }

  componentDidMount() {
    this.updateStatus();
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  updateStatus() {
    let jstate = JSON.parse(JSON.stringify(this.props.state));
    let jsettings = JSON.parse(JSON.stringify(this.props.settings));

    // rimuovo i campi superflui dall'output
    delete jstate["dest"];
    delete jstate["type"];
    delete jsettings["dest"];
    delete jsettings["type"];

    let state = JSON.stringify(jstate, null, 1).replace(/\{|\}|"|,|/g, "").replace("\n", "");
    let settings = JSON.stringify(jsettings, null, 1).replace(/\{|\}|"|,/g, "");

    this.setState({
      status: state + settings
    });
  };

  render() {
    return (
      <Card>
        <CardHeader>
          <Button block color="link" className="text-left m-0 p-0" onClick={this.toggle} aria-expanded={this.state.collapse} >
            <strong>Status</strong>
          </Button>
        </CardHeader>
        <Collapse isOpen={!this.state.collapse}>
          <CardBody >
            <pre>
              <code>
                {this.state.status}
              </code>
            </pre>
          </CardBody>
        </Collapse>
        <CardFooter>
          <Button type="submit" size="sl" color="danger" onClick={this.props.toggleButton}><i className="fa fa-refresh"></i> Reload</Button>
        </CardFooter>

      </Card>
    )
  }
}
export default Bike;