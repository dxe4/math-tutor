from dataclasses import dataclass, field
from typing import Any

from asgiref.sync import async_to_sync
from celery import shared_task
from channels.layers import get_channel_layer
from sympy.ntheory.primetest import isprime


@dataclass
class TaskProgress:
    session_id: str
    channel_layer: Any = field(default_factory=get_channel_layer)

    def send_event(self, event_type, data):
        async_to_sync(self.channel_layer.group_send)(
            f"task_{self.session_id}",
            {"type": "task_event", "data": {"event_type": event_type, **data}},
        )


@shared_task(name="is_prime_task")
def is_prime_task(session_id: str, start: int, end: int):
    # TODO this can be used  by a malicious user to fill the queue
    progress = TaskProgress(session_id)
    try:
        progress.send_event(
            "status",
            {
                "status": "started",
            },
        )

        for i in range(start, end):
            result = isprime(i)
            progress.send_event(
                "progress", {"result": {"number": i, "is_prime": result}}
            )

        progress.send_event(
            "complete",
            {
                "status": "completed",
            },
        )
    except Exception as e:
        progress.send_event(
            "error",
            {
                "status": "error",
            },
        )
        raise Exception from e
