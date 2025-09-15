---
title: "Streaming Metrics Dashboard"
summary: "Cut dashboard lag from 60m → <5m with Kafka + Spark."
tags: [data-engineering, streaming]
repo: "https://github.com/you/streaming-metrics"
---
## Problem
Ops discovered incidents too late; hourly refresh wasn’t enough.

## Architecture
Kafka → Spark Structured Streaming → OLAP store → Dashboard.

## Results
Dashboard latency <5 minutes; earlier incident detection.
