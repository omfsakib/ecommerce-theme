import datetime

def get_context(context):
    context.date = (datetime.datetime.now() + datetime.timedelta(days=5)).date()
