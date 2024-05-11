import Swal from "sweetalert2";

export function SweetAlertSessionExpired(url: any) {
    Swal.fire({
        showCloseButton: true,
        showConfirmButton: false,
        icon: "info",
        customClass: {
            title: 'custom-title',
            popup : 'custom-popup'
        },
        heightAuto : false,
        title: 'Session หมดอายุ',
    }).then((rs) => {
        if (rs.isConfirmed) {
            window.location.href = url
        }
    });
}
