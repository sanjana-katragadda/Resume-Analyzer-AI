function SkillsCard({ skills }) {

    return (

        <div className="card">

            <h2>Skills</h2>

            {skills.length===0 ? (
                <p>No skills found.</p>
            ) : (

                skills.map((skill,index)=>(

                    <span
                        key={index}
                        className="skill"
                    >
                        {skill}
                    </span>

                ))

            )}

        </div>

    );

}

export default SkillsCard;