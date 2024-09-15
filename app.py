from flask import Flask,render_template,request,jsonify
import sqlite3

app=Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def get_db_connection():
    conn = sqlite3.connect('log.db')
    conn.row_factory = sqlite3.Row  # 使得查询结果以字典形式返回
    return conn

@app.route('/logs', methods=['GET'])
def get_logs():
    conn = get_db_connection()
    cursor = conn.cursor()

    # 查询所有日志记录
    cursor.execute("SELECT * FROM log")
    logs = cursor.fetchall()
    conn.close()

    # 返回查询结果（以 JSON 形式）
    return jsonify([dict(row) for row in logs])

@app.route('/addlog', methods=['POST'])
def add_log():
    data = request.get_json()
    payer = data['payer']
    payee = data['payee']
    amount = data['amount']
    conn = get_db_connection()
    cursor = conn.cursor()

    # 插入一条日志记录
    cursor.execute("INSERT INTO log (payer, payee, amount) VALUES (?, ?, ?)", (payer, payee, amount))
    conn.commit()
    conn.close()

    # 返回插入成功的信息
    return jsonify({"message": "Log added successfully!"})


if __name__=='__main__':
    conn = sqlite3.connect('log.db')
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        payer TEXT NOT NULL,
        payee TEXT NOT NULL,
        amount REAL NOT NULL
    )
    ''')
    conn.commit()
    conn.close()
    app.run(debug=True)
