/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FontAwesome from 'react-fontawesome';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Typography from '@material-ui/core/Typography';
import moment from 'moment-timezone';
import {
  Table,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { transactionType } from '../types';
import JSONTree from 'react-json-tree';

const readTheme = {
  base00: '#f3f3f3',
  base01: '#2e2f30',
  base02: '#515253',
  base03: '#737475',
  base04: '#959697',
  base05: '#b7b8b9',
  base06: '#dadbdc',
  base07: '#fcfdfe',
  base08: '#e31a1c',
  base09: '#e6550d',
  base0A: '#dca060',
  base0B: '#31a354',
  base0C: '#80b1d3',
  base0D: '#3182bd',
  base0E: '#756bb1',
  base0F: '#b15928'
};
const writeTheme = {
  base00: '#ffffff',
  base01: '#2e2f30',
  base02: '#515253',
  base03: '#737475',
  base04: '#959697',
  base05: '#b7b8b9',
  base06: '#dadbdc',
  base07: '#fcfdfe',
  base08: '#e31a1c',
  base09: '#e6550d',
  base0A: '#dca060',
  base0B: '#31a354',
  base0C: '#80b1d3',
  base0D: '#3182bd',
  base0E: '#756bb1',
  base0F: '#b15928'
};

const styles = () => ({
  root: {
    flexGrow: 1,
    paddingTop: 42,
    position: 'relative',
  },
});
const reads = {
  color: '#2AA233',
};
const writes = {
  color: '#DD8016',
};

export class TransactionView extends Component {
  componentWillMount() {
    const theme = sessionStorage.getItem('toggleTheme') === 'true';
    this.setState({ toggleClass: theme });
  }

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  render() {
    const { transaction } = this.props;
    const { toggleClass } = this.state;
    if (transaction && !transaction.read_set) {
      return (
        <div className={toggleClass ? 'dark-theme' : ''}>
          <div>
            <CardTitle className="dialogTitle">
              <FontAwesome name="list-alt" className="listIcon" />
              Transaction
              Details
              <button type="button" onClick={this.handleClose} className="closeBtn">
                <FontAwesome name="close" />
              </button>
            </CardTitle>
            <div align="center">
              <CardBody className="card-body">
                <span className="loading-wheel">
                  {' '}
                  <FontAwesome name="circle-o-notch" size="3x" spin />
                </span>
              </CardBody>
            </div>
          </div>
        </div>
      );
    } if (transaction) {
      return (
        <div className={toggleClass ? 'dark-theme' : ''}>
          <div className="dialog">
            <Card>
              <CardTitle className="dialogTitle">
                <FontAwesome name="list-alt" className="listIcon" />
                Transaction
                Details
                <button type="button" onClick={this.handleClose} className="closeBtn">
                  <FontAwesome name="close" />
                </button>
              </CardTitle>
              <CardBody>
                <Table striped hover responsive className="table-striped">
                  <tbody>
                    <tr>
                      <th>
                        Transaction ID:
                      </th>
                      <td>
                        {transaction.txhash}
                        <button type="button" className="copyBtn">
                          <div className="copyMessage">
                            Copy
                          </div>
                          <div className="copiedMessage">
                            Copied
                          </div>
                          <CopyToClipboard text={transaction.txhash}>
                            <FontAwesome name="copy" />
                          </CopyToClipboard>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Validation Code:
                      </th>
                      <td>
                        {transaction.validation_code}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Payload Proposal Hash:
                      </th>
                      <td>
                        {transaction.payload_proposal_hash}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Creator MSP:
                      </th>
                      <td>
                        {transaction.creator_msp_id}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Endoser:
                      </th>
                      <td>
                        {transaction.endorser_msp_id}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Chaincode Name:
                      </th>
                      <td>
                        {transaction.chaincodename}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Type:
                      </th>
                      <td>
                        {transaction.type}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Time:
                      </th>
                      <td>
                        {moment(transaction.createdt)
                          .tz(moment.tz.guess())
                          .format('M-D-YYYY h:mm A zz')}
                      </td>
                    </tr>
                    <tr>
                      <th style={reads}>
                        Reads:
                      </th>
                      <td>
                        <JSONTree data={transaction.read_set} theme={readTheme} invertTheme={false}/>
                      </td>
                    </tr>
                    <tr>
                      <th style={writes}>
                        Writes:
                      </th>
                      <td>
                      <JSONTree data={transaction.write_set} theme={writeTheme} invertTheme={false}/>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    }
    return (
      <div className={toggleClass ? 'dark-theme' : ''}>
        <CardTitle className="dialogTitle">
          <FontAwesome name="list-alt" className="listIcon" />
          Transaction
          Details
          <button type="button" onClick={this.handleClose} className="closeBtn">
            <FontAwesome name="close" />
          </button>
        </CardTitle>
        <div align="center">
          <CardBody className="card-body">
            <span className="loading-wheel">
              {' '}
              <FontAwesome name="circle-o-notch" size="3x" spin />
            </span>
          </CardBody>
        </div>
      </div>
    );
  }
}

TransactionView.propTypes = {
  transaction: transactionType,
};

TransactionView.defaultProps = {
  transaction: null,
};

export default withStyles(styles)(TransactionView);
