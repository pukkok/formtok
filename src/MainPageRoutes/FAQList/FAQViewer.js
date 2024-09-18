import React from "react";
import FAQs from '../../Datas/FAQs'

function FAQViewer(){
    console.log(FAQs)

    return <section>
        faq페이지
        <div className="card">
        {FAQs.map((faq, idx) => {
            const {q, options, type} = faq
            return <div key={idx}>
                <span>{type}</span>
                <p>{q}</p>
                <div>
                    {options.map((option, idx2) => {
                        return <p key={idx2}>{option.answer}</p>
                    })}
                </div>
            </div>
        })}
        </div>
    </section>
}
export default FAQViewer