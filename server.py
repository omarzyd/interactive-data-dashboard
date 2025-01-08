from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine
import pandas as pd


app = Flask(__name__)


# Create database engine
db_file = 'demo.db'
engine = create_engine(f'sqlite:///{db_file}')


@app.route('/')
def index():
    # Render the main dashboard page
    return render_template('index.html')


@app.route('/get-purchase-by-age-group')
def get_purchase_by_age_group():
    """
    Query Purchase Behavior by Age Group
    """
    query = "SELECT Age, SUM(Purchase) AS TotalPurchase FROM myData GROUP BY Age"
    result = pd.read_sql(query, engine)
    return result.to_json(orient='records')


@app.route('/get-gender-vs-avg-purchase')
def get_gender_vs_avg_purchase():
    """
    Query average purchase by gender and product categories
    """
    query = """
    SELECT Gender,
           AVG(Product_Category_1) AS Category1,
           AVG(Product_Category_2) AS Category2,
           AVG(Product_Category_3) AS Category3
    FROM myData
    GROUP BY Gender
    """
    result = pd.read_sql(query, engine)
    return result.to_json(orient='records')



@app.route('/get-occupation-vs-purchase')
def get_occupation_vs_purchase():
    """
    Query Occupation vs Purchase
    """
    query = """
        SELECT Occupation, SUM(Purchase) AS TotalPurchase
        FROM myData
        GROUP BY Occupation
        ORDER BY TotalPurchase DESC
    """
    # Fetch data from database
    result = pd.read_sql(query, engine)
    # Convert the result to JSON format
    return result.to_json(orient='records')


@app.route('/get-city-category-distribution')
def get_city_category_distribution():
    """
    Query City Category Distribution
    """
    query = "SELECT City_Category, COUNT(User_ID) AS UserCount FROM myData GROUP BY City_Category"
    result = pd.read_sql(query, engine)
    return result.to_json(orient='records')


if __name__ == '__main__':
    app.run(debug=True)