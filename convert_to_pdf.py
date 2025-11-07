import os
import subprocess
import sys

# UTF-8 출력 설정
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 현재 디렉토리의 index.html 경로
html_file = os.path.join(os.getcwd(), "index.html")
pdf_file = os.path.join(os.getcwd(), "겨울상품_랜딩페이지.pdf")

print(f"HTML 파일: {html_file}")
print(f"PDF 저장 위치: {pdf_file}")

# Chrome/Edge를 사용하여 PDF로 변환
chrome_paths = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
]

chrome_path = None
for path in chrome_paths:
    if os.path.exists(path):
        chrome_path = path
        print(f"브라우저 찾음: {chrome_path}")
        break

if chrome_path:
    try:
        cmd = [
            chrome_path,
            "--headless",
            "--disable-gpu",
            "--run-all-compositor-stages-before-draw",
            "--print-to-pdf=" + pdf_file,
            "file:///" + html_file.replace("\\", "/")
        ]

        print("PDF 변환 중...")
        result = subprocess.run(cmd, capture_output=True, timeout=30)

        if os.path.exists(pdf_file):
            print(f"성공! PDF 파일이 생성되었습니다: {pdf_file}")
        else:
            print("PDF 생성 실패")
    except Exception as e:
        print(f"오류 발생: {e}")
else:
    print("Chrome 또는 Edge 브라우저를 찾을 수 없습니다.")
    print("\n대안: 브라우저에서 수동으로 PDF 저장하기")
    print("1. index.html 파일을 브라우저에서 열기")
    print("2. Ctrl+P 누르기")
    print("3. '대상'을 'PDF로 저장'으로 선택")
    print("4. 저장하기")
