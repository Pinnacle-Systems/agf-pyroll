import React from 'react';
import DXFunnel, {
    Export,
    Tooltip,
    Item,
    Border,
    Label,
} from 'devextreme-react/funnel';
import './donutChartMui.css'

const formatLabel = (arg) =>
    `<span style="font-size: 16px">${arg.percentText}</span><br/><span >${arg.item.argument}</span>`;

function MyFunnel({ topSupplierLastTrurnOver }) {
    console.log(topSupplierLastTrurnOver, 'topSupplierLastTrurnOver');
    const topTurnOver = topSupplierLastTrurnOver.map(item =>
    ({
        argument: item.supplier, value: item.amount
    }))

    return (
        <div className="my-funnel-wrapper"> {/* Add a wrapper div */}
            <DXFunnel
                id="funnel"
                dataSource={topTurnOver}
                argumentField="argument"
                valueField="value"
                height={300}
                palette={['#007bff', '#28a745', '#dc3545', '#ffc107', '#6c757d']}
            >

                <Tooltip enabled={true} format="fixedPoint" />
                <Item>

                </Item>
                <Label
                    visible={true}
                    position="inside"
                    backgroundColor="none"
                    customizeText={formatLabel}
                />
            </DXFunnel>
        </div>
    );
}

export default MyFunnel;
