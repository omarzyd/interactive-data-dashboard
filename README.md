Interactive Dashboard for Purchase Analysis

## Overview
This project provides an interactive, web-based dashboard for analyzing purchase behavior. Designed for business managers, it offers insights into key metrics such as purchase trends, customer demographics, and regional performance. The dashboard is built with Flask for the backend, SQLite for data storage, and AMCharts for interactive visualizations, ensuring a seamless user experience.


# Features

# Key Metrics
1. Total Revenue: Displays the total revenue generated from purchases.
2. Total Customers: Shows the number of unique customers.
3. Top-Selling Product: Highlights the product with the highest sales.

# Interactive Charts
1. **Purchase by Age Group**:
   - Bar chart showing total purchases segmented by age groups.
   - Drill-down functionality for further insights.
2. **City Category Distribution**:
   - Pie chart illustrating the percentage of customers from each city category.
   - Interactive tooltips and legends.
3. **Average Purchases by Gender**:
   - Grouped bar chart comparing purchase patterns by gender across product categories.
4. **Occupation vs. Purchase**:
   - Horizontal bar chart displaying total purchases grouped by occupation.
   - Dynamic sorting for real-time updates.


## **Project Structure**

├── static/
│   ├── css/
│   │   └── sb-admin-2.min.css  # Dashboard styling
│   ├── js/
│   │   ├── chart-age-group.js  # Script for age group chart
│   │   ├── chart-gender-avg.js # Script for gender chart
│   │   ├── chart-occupation.js # Script for occupation chart
│   │   └── chart-city-category.js # Script for city distribution chart
├── templates/
│   └── index.html              # Main dashboard page
├── demo.db                     # SQLite database with sample data
├── server.py                   # Flask application backend
├── README.md                   # Project documentation
├── requirements.txt            # Python dependencies



## Technologies Used

1. **Frontend**:
   - HTML, CSS (Bootstrap)
   - AMCharts for dynamic visualizations
2. **Backend**:
   - Flask (Python)
   - SQLite database
3. **Deployment**:
   - Local environment for development

---

## **Setup Instructions**
### **1. Prerequisites**
- Python 3.10 or later installed on your system.

### **2. Install Dependencies**
- Navigate to the project directory and run:
  pip install -r requirements.txt

**3. Run the Application**

- Start the Flask server:
  python server.py
- Access the dashboard at `http://127.0.0.1:5000` in your web browser.


**Endpoints**

1. `/get-purchase-by-age-group`: Returns purchase data grouped by age.
2. `/get-city-category-distribution`: Provides the distribution of customers by city category.
3. `/get-gender-vs-avg-purchase`: Returns average purchase data by gender and product category.
4. `/get-occupation-vs-purchase`: Returns total purchase data grouped by occupation.


 **Customization**

1. **Data Queries**:
   - Modify database queries in `server.py` to suit your needs.
2. **Charts**:
   - Update JavaScript files in the `static/js/` folder to change chart behavior or styling.
3. **Styling**:
   - Modify `sb-admin-2.min.css` for custom styles.


**Troubleshooting**

1. **Flask not found**:
   - Install Flask with:
     pip install flask

2. **Charts not loading**:
   - Check your internet connection (AMCharts uses CDN).
   - Verify the `demo.db` file exists in the project folder.


## **Future Work**
1. Add filters for dynamic data selection (e.g., date range, regions).
2. Include predictive analytics for forecasting purchase trends.
3. Integrate a real-time database for live updates.
4. Add user authentication for personalized dashboards.

