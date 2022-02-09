from rest_framework import pagination, response


class CustomPagination(pagination.PageNumberPagination):
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        return response.Response({
            'count': self.page.paginator.count,
            'page': self.page.number,
            'results': data,
        })
