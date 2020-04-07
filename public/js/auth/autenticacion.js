class Autenticacion {
  autEmailPass (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result =>{
        if (result.user.emailVerified) {
            $('#avatar').attr('src', 'imagenes/usuario_auth.png')
            Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
        }else {
          firebase.auth().signOut()
          Materialize.toast(`por favor realiza la verificación de la cuenta en tu correo electronico`, 5000)
        }
      })
    //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
    //Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
    $('.modal').modal('close')

  }

  crearCuentaEmailPass (email, password, nombres) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result =>{
        result.user.updateProfile({
          displayName : nombres
        })

        const configuracion = {
          url:'http://localhost/blogeek-platzi/public/'
        }

        result.user.sendEmailVerification(configuracion).catch(error =>{
          console.error(error)
          Materialize.toast(error.message, 4000)
        })

        firebase.auth().signOut()

        Materialize.toast(
          `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
          4000
      )

        $('.modal').modal('close')
      })
      .catch(error =>{
        console.error(error)
        Materialize.toast(error.message, 4000)
      })
    /*Materialize.toast(
      `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
      4000
    )

    $('.modal').modal('close')*/

  }

  authCuentaGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider()//nombre del proveedor de autenticación

    firebase.auth().signInWithPopup(provider)
    .then(result => {
      $('#avatar').attr('src', result.user.photoURL)
      $('.modal').modal('close')
      Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
    })
    .catch(error =>{
      console.error(error);
      Materialize.toast(`Error al autenticar usuario con google: ${error} !! `, 4000)
    })
  }

  authCuentaFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider()//nombre del proveedor de autenticación

    firebase.auth().signInWithPopup(provider)
    .then(result => {
      $('#avatar').attr('src', result.user.photoURL)
      $('.modal').modal('close')
      Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
    })
    .catch(error =>{
      console.error(error);
      Materialize.toast(`Error al autenticar usuario con facebook: ${error} !! `, 4000)
    })
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authTwitter () {
    // TODO: Crear auth con twitter
  }
}
