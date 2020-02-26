import React from "react";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
// import "./DialogResult.css";

interface MyProps {
  onOpenDialog(replay: boolean, notReplay: boolean): void;
  win: boolean;
  word: string;
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

  handleCloseReplay = () => {
    this.setState({ openDialog: false });
    this.props.onOpenDialog(true, false);
  };

  handleCloseNotReplay = () => {
    this.setState({ openDialog: false });
    this.props.onOpenDialog(false, true);
  };

  render() {
    const { win, word } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.openDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {win ? "You win !!!" : `You loose !!! Le mot était ${word}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Voulez-vous rejouer ???
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/">
              <Button onClick={this.handleCloseNotReplay} color="primary">
                Non
              </Button>
            </Link>
            <Button onClick={this.handleCloseReplay} color="primary" autoFocus>
              Oui
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DialogResult;
