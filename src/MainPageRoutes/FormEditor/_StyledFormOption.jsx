import styled from "styled-components";

const FormOptionWrapper = styled.div`
    width: 100%;
    padding: 0 16px;
    padding-top: 10px;
    border-top: 1px solid var(--pk-charcoal);

    h4{
        margin-bottom: 10px;
    }

    .period-box{
        width: 100%;
        display: inline-flex;
        justify-content: space-between;

        p{
            margin-bottom: 10px;
            font-size: 18px;
        }
        input{
            font-size: 17px;
            margin-bottom: 20px;
        }
    
        input[type="date"]::-webkit-calendar-picker-indicator { 
            filter: invert(.8);
            cursor: pointer;
        }
    }

    
`

export default FormOptionWrapper