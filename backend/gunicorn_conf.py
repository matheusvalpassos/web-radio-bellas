import multiprocessing

bind = "0.0.0.0:8000"
workers = set([multiprocessing.cpu_count() * 2 + 1, 2]).pop() # Min 2 workers
timeout = 120 # Timeout mais longo devido ao download do yt-dlp
