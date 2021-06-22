import { Button } from "@material-ui/core";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { firebase } from "@firebase/app";

import "./PageLogin.css";

function PageLogin() {
  const handleGoogleSignIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  return (
    <div>
      <div className="signin">
        <h1>Collectio</h1>
      </div>

      <div className="signin">
        <FirebaseAuthConsumer>
          {({ firebase }) => (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleGoogleSignIn(firebase)}
            >
              Sign in with Google
            </Button>
          )}
        </FirebaseAuthConsumer>
      </div>
    </div>
  );
}

export default PageLogin;
