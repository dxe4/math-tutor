from django.urls import path

from math_content import views

urlpatterns = [
    path("topics/", views.StAndrewTopicView.as_view(), name="topic-list"),
    path("curves/", views.StAndrewsCurveView.as_view(), name="curve-list"),
    path("biographies/", views.StAndrewsBiographyView.as_view(), name="biography-list"),
    path("prime-check/", views.PrimeCheckView.as_view(), name="prime-check"),
    path(
        "power-two-convergence/",
        views.PowerOfTwoConvergence.as_view(),
        name="power-two-convergence",
    ),
    path("collatz/", views.CollatzConjectureView.as_view(), name="collatz"),
]
