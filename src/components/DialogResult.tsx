import React from "react";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import "../assets/css/DialogResult.css";

interface MyProps {
  onDialogReplay?(replay: boolean): void;
  win: boolean;
  looseMessage: string;
  link?: string;
  pendu?: boolean;
}
interface MyState {
  openDialog: boolean;
}

class DialogResult extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      openDialog: true
    };
  }

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  handleCloseReplayPendu = () => {
    this.setState({ openDialog: false });
    this.props.onDialogReplay!(true);
  };

  render() {
    const { win, looseMessage, pendu, link } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.openDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {win ? "You win !!!" : looseMessage}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Voulez-vous rejouer ???
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/">
              <button className="buttondialog" onClick={this.handleClose}>
                Non
              </button>
            </Link>
            {pendu ? (
              <button
                className="buttondialog"
                onClick={this.handleCloseReplayPendu}
              >
                Oui
              </button>
            ) : (
              <Link to={{ pathname: `${link}` }}>
                <button className="buttondialog" onClick={this.handleClose}>
                  Oui
                </button>
              </Link>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DialogResult;
