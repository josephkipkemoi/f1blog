const DonateComponent = () => {
    return (
        <div className="card">
            <div className="card card-header bg-white border-0 mt-3">
                <h5 className="text-dark">Please Donate</h5>
            </div>
            <hr/>
            <div className="card card-body border-0">
                <div>
                    <h3>Paypall</h3>
                    <div className="d-flex  align-items-center mt-3">
                        <span>Addess:</span>
                        <input className="form-control p-3 mt-3 mb-3 fw-bold m-2 w-25 text-center" type="email" disabled value={"jkemboe@gmail.com"}/>
                    </div>
                </div>
                <div>
                    <h3>Mpesa</h3>
                    <div className="d-flex  align-items-center mt-3">
                        <label>Paybill:</label>
                        <input className="form-control p-3 mt-3 mb-3 fw-bold m-2  w-25 text-center" type="number" disabled value={"898105"}/>
                    </div>
                    <div className="d-flex  align-items-center mt-3">
                        <label>Account No:</label>
                        <input className="form-control p-3 mt-3 mb-3 fw-bold m-2 w-25 text-center" type="text" disabled value={"07xxxxxxxx"}/>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="card card-footer border-0">
                <p className="text-center m-3">All donations are for all authors, editors, content-creators, publishers who work for free to keep you updated. Thank you for your audience.</p>
            </div>
        </div>
    )
}

export default DonateComponent