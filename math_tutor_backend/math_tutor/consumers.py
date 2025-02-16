import json

from channels.generic.websocket import AsyncWebsocketConsumer


class AnonymousTaskConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.session_id = self.scope["url_route"]["kwargs"]["session_id"]
        self.group_name = f"task_{self.session_id}"

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def task_event(self, event):
        await self.send(text_data=json.dumps(event["data"]))
