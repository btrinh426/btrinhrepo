import Swal from 'sweetalert2';

let onActionSuccess = res => {
    console.log('response ',res)
    Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
    )
      this.props.location.push('/')
}

let onActionErr = errResponse => {
    console.log(errResponse)
    Swal.fire(
        'Sorry! Invalid information.',
        'Please check your info and try agian.',
        'error'
    )
}

export { onActionErr, onActionSuccess }