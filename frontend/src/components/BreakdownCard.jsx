function BreakdownCard({ breakdown }) {

    return(

        <div className="card">

            <h2>📈 Resume Breakdown</h2>

            {

                Object.entries(breakdown).map(([key,value])=>(

                    <div
                        key={key}
                        style={{marginTop:"20px"}}
                    >

                        <div
                            style={{
                                display:"flex",
                                justifyContent:"space-between"
                            }}
                        >

                            <span
                                style={{textTransform:"capitalize"}}
                            >
                                {key}
                            </span>

                            <span>{value}/20</span>

                        </div>

                        <div className="progress">

                            <div
                                className="progress-fill"
                                style={{
                                    width:`${value*5}%`
                                }}
                            >

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    )

}

export default BreakdownCard;