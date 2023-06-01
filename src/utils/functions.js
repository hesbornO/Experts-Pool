
function displayServerErrMessage(err){
    if (err.response !== undefined){
        err = err.response
    }
    console.log("error", err)
    let full_error_message = ''
    Object.keys(err).map(msg_instance => {
        full_error_message += msg_instance.toString() + ':' + err[msg_instance] + "\n";
    })
    this.$toast.error(full_error_message)
}


function setUserDetails(decoded_token){
    localStorage.setItem('full_name', decoded_token.full_name)
    localStorage.setItem('username', decoded_token.username)
    localStorage.setItem('level', decoded_token.level)
    localStorage.setItem('region', decoded_token.region)
    localStorage.setItem('roles', decoded_token.roles)
    localStorage.setItem('is_superuser', decoded_token.is_superuser)
}

function removeUserDetails(){
    localStorage.removeItem('token')
    localStorage.removeItem('full_name')
    localStorage.removeItem('username')
    localStorage.removeItem('level')
    localStorage.removeItem('region')
    localStorage.removeItem('roles')
    localStorage.removeItem('is_superuser')
}



export default {
    displayServerErrMessage,
    setUserDetails,
    removeUserDetails
}