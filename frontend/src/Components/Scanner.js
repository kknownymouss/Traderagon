import { QrReader } from 'react-qr-reader';


function Scanner(props) {
    return ( 
        <div style={{width: "100%", height: "auto"}}>
            <QrReader
                onResult={(result, error) => {
                if (!!result) {
                    props.setResult(result?.text);
                }

                if (!!error) {
                    console.info(error);
                }
                }}
                style={{ width: '100%' }}
            />
        </div>
    )
}

export default Scanner;