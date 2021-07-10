
function displayServerErrMessage(err){
    let full_error_message = ''
    Object.keys(err).map(msg_instance => {
        full_error_message += msg_instance.toString() + ':' + err[msg_instance] + "\n";
    })
    this.$toast.error(full_error_message)
}


export default {
    displayServerErrMessage
}