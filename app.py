from flask import Flask, redirect, request, jsonify, render_template, url_for
import config

app = Flask(__name__)
app.config.from_object("config")

# 因为vue和render_template的模板都是用{{  }}，所以会冲突，将flask的修改为[[  ]]
app.jinja_env.variable_start_string = '[['
app.jinja_env.variable_end_string = ']]'

# 欢迎页面
@app.route('/')
def index():
    return render_template("index.html")

# 判断页面
@app.route("/yesno", methods=["POST"])
def judgeAnswer():
    msg = {
        "flag": "",
        "data": ""
    }
    if request.method == "POST":
        # 获取前端表单数据
        '''
        axios不同于普通的Ajax，这表现在，当发起Ajax时，post的数据其实是一个FormData，
        而axios则是一个PayLoad，所以，在接收数据的方法上略有不同。
        （Ajax的接收方法是：request.form.get(‘aa’)或者直接resquest.form[‘aa’]）
        原文链接：https://blog.csdn.net/weixin_43705559/article/details/94737607
        '''
        formData = request.get_json(silent=True)
        # 如果问题为空
        if len(formData['question']) == 0:
            # 设置相应字段值
            msg['flag'] = 0
            msg['data'] = 'no'
            # 返回结果
            return jsonify(msg)
        else:
            msg['flag'] = 1
            msg['data'] = 'yes'
        # 返回结果
        return jsonify(msg)
    else:
        # 请求方式错误
        return render_template('405.html')


if __name__ == "__main__":
    app.run(host="127.0.0.1",
            port=8888)
