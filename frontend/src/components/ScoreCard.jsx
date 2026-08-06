function ScoreCard({ score }) {

    return(

        <div className="card">

            <h2>📊 Resume Score</h2>

            <h1
                style={{
                    color:"#2563eb",
                    fontSize:"70px",
                    textAlign:"center",
                    marginTop:"20px"
                }}
            >
                {score}/100
            </h1>

        </div>

    )

}

export default ScoreCard;