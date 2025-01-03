from flask import request
from flask_restx import Resource

from app.main.service.feedback_service import add, get_all_feed, generate_pdf_report
from app.main.utils.dto import Feedback

api = Feedback.api
_fb = Feedback._fb
fb = Feedback.pagination
date_range_model = Feedback.date_range_model
@api.route('/add')
class AddFeedBack(Resource):
    @api.doc('send fb')
    @api.expect(_fb, validate=True)
    def post(self):
        """List all registered users"""
        token= request.headers.get('Authorization')
        post_data = request.json
        return add(post_data,token)
@api.route('/get-all-feed')
class GetFeed(Resource):
    @api.doc('danh sach feed')
    @api.marshal_list_with(fb)
    def get(self):
        """List all registered users"""
        return get_all_feed()
@api.route('/generate')
class GeneratePdfReport(Resource):
    @api.doc('Tạo báo cáo feedback dạng PDF')
    @api.expect(date_range_model, validate=True)
    def post(self):
        data = request.json
        print(data)
        """Tạo báo cáo feedback dạng PDF theo ngày bắt đầu và ngày kết thúc"""
        return generate_pdf_report(data)