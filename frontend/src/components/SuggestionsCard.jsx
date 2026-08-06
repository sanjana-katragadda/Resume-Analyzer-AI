function SuggestionsCard({ suggestions }) {

    return (

        <div className="card">

            <h2>Suggestions</h2>

            <ul>

                {suggestions.map((item,index)=>(

                    <li key={index}>
                        ✔ {item}
                    </li>

                ))}

            </ul>

        </div>

    );

}

export default SuggestionsCard;