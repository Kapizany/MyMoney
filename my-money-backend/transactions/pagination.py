from rest_framework import pagination, response

class CustomPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        return response.Response({
            'count': self.page.paginator.count,
            'page': self.page.number,
            'results': data,
        })