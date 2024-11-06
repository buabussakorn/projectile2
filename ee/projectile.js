const g = 9.8;  // ความเร่งเนื่องจากแรงโน้มถ่วง (m/s^2)

// ฟังก์ชันคำนวณตำแหน่งและความเร็ว
function projectileMotion(v0, theta, t) {
    const thetaRad = theta * Math.PI / 180;  // แปลงองศาเป็นเรเดียน
    const sx = v0 * Math.cos(thetaRad) * t;
    const sy = v0 * Math.sin(thetaRad) * t - 0.5 * g * t * t;
    const vx = v0 * Math.cos(thetaRad);
    const vy = v0 * Math.sin(thetaRad) - g * t;
    const sy_max = (Math.pow(v0,2)*Math.pow(Math.sin(thetaRad),2)) / (2*g);
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `
        ความเร็วในแนวระดับ (m/s): ${vx.toFixed(2)}<br>
        การกระจัดสูงที่สุดในแนวดิ่ง (m) : ${sy_max.toFixed(2)}<br>
        เวลา (s): ${t.toFixed(2)}<br>
        
    `;
    return { sx, sy, vx, vy, sy_max };
}

// ฟังก์ชันสำหรับการคำนวณและแสดงผลกราฟ
function plotGraph() {
    const v0 = parseFloat(document.getElementById('velocity').value);  // รับค่าความเร็วเริ่มต้นจากฟอร์ม
    const theta = parseFloat(document.getElementById('angle').value);  // รับค่าองศาจากฟอร์ม

    // คำนวณเวลาที่วัตถุอยู่ในอากาศ
    const tMax = (2 * v0 * Math.sin(theta * Math.PI / 180)) / g;
    const numPoints = 100;
    const dt = tMax / numPoints;

    let xData = [];
    let yData = [];
    let textData = [];

    // คำนวณตำแหน่งและความเร็วในแต่ละช่วงเวลา
    for (let i = 0; i <= numPoints; i++) {
        const t = i * dt;
        const { sx, sy, vx, vy, } = projectileMotion(v0, theta, t);
        if (sy >= 0) {  // แสดงเฉพาะช่วงที่วัตถุอยู่ในอากาศ
            xData.push(sx);
            yData.push(sy);
            textData.push(`t = ${t.toFixed(2)}s<br>vx = ${vx.toFixed(2)} m/s<br>vy = ${vy.toFixed(2)} m/s<br>sx = ${sx.toFixed(2)} m<br>sy = ${sy.toFixed(2)} `);
        }
    }

    // สร้างกราฟโดยใช้ Plotly
    const trace = {
        x: xData,
        y: yData,
        mode: 'lines+markers',
        type: 'scatter',
        text: textData,  // ข้อความที่จะแสดงเมื่อ hover
        hoverinfo: 'text',
        marker: { size: 8 },
        line: { shape: 'spline' }
    };

    const layout = {
        title: 'Projectile Motion',
        xaxis: { title: 'Distance (m)' },
        yaxis: { title: 'Height (m)' },
        showlegend: false
    };

    Plotly.newPlot('graph', [trace], layout);  // อัปเดตกราฟ
}

// แสดงกราฟเริ่มต้นเมื่อโหลดหน้าเว็บ
window.onload = plotGraph;
