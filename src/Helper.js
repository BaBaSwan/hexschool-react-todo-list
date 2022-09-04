import Swal from 'sweetalert2'

export const showError = async (message) => {
  // Wait for the user to press a button...
  await Swal.fire({
    title: message,
    // width: 600,
    // padding: '3em',
    color: '#FF0000',
  })
}