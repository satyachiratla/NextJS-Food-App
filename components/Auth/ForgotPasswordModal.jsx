export default function ForgotPasswordModal({ message }) {
  return (
    <dialog id="forgot-password" className="modal">
      <div className="modal-box">
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
