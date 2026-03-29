module.exports = {
  apps: [
    {
      name: 'frontend-payload',
      cwd: '/home/kang/nextfastapi/frontend',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'backend-api',
      cwd: '/home/kang/nextfastapi/backend',
      script: './venv/bin/python3',
      args: '-m uvicorn main:app --host 0.0.0.0 --port 8000 --reload',
      env: {
        PYTHONPATH: '.',
      },
    },
    {
      name: 'rendering-worker',
      cwd: '/home/kang/nextfastapi/rendering-worker',
      script: '/home/kang/nextfastapi/backend/venv/bin/python3',
      args: 'processor.py',
      env: {
        PYTHONPATH: '.',
      },
    }
  ]
}
