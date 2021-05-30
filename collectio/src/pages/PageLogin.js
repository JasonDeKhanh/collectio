import { Button } from "@material-ui/core";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { firebase } from "@firebase/app";

function PageLogin() {
  const handleGoogleSignIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  return (
    <>
      <h1>Collectio</h1>
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
    </>
  );
}

export default PageLogin;
