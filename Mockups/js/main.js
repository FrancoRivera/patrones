function validarLogin() {
    if (sessionStorage.getItem('user') != null)
        return true;
    else {
        return false }
}
